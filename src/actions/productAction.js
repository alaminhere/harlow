'use server';

import slugify from 'slugify';
import connectDb from '@/libs/connectDb';
import cloudinary from '@/libs/cloudinary';
import { revalidatePath } from 'next/cache';
import uploadImage from '@/libs/uploadImage';
import { Product } from '@/models/productSchema';
import { Category } from '@/models/categorySchema';
import { sendResponse } from '@/libs/sendResponse';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/authOptions';

// submit product
export const submitProduct = async (fileData, prevData, formData) => {
  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const discountPrice = formData.get('discountprice');
  const category = formData.get('category');
  const stock = formData.get('stock');
  const width = formData.get('width');
  const height = formData.get('height');
  const packages = formData.get('packages');
  const brand = formData.get('brand');
  const isnew = formData.get('isnew');
  const isFeatured = formData.get('isfeatured');

  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) return sendResponse(false, 'Unauthorized');
    if (user.role !== 'admin') return sendResponse(false, 'Forbidden');

    if (
      !title ||
      !description ||
      !price ||
      !discountPrice ||
      !category ||
      !stock ||
      !width ||
      !height ||
      !packages ||
      !brand ||
      !isnew ||
      !isFeatured ||
      fileData.length < 3
    ) {
      return sendResponse(
        false,
        'Please fill in all required fields and upload at least 3 images!',
      );
    }

    await connectDb();
    const images = await Promise.all(
      fileData.map(async item => await uploadImage(item)),
    );
    const slug = slugify(title, { lower: true, strict: true });

    await Product.create({
      title,
      description,
      price: Number(price),
      discountPrice: Number(discountPrice),
      category,
      images,
      slug,
      stock: Number(stock),
      width: Number(width),
      height: Number(height),
      packages: Number(packages),
      brand,
      isFeatured: isFeatured,
      isNew: isnew,
    });

    revalidatePath('/admin/products');
    revalidatePath('/shop');

    return sendResponse(true, 'Product submitted successfully');
  } catch (err) {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

//  get products
export const getAllProducts = async params => {
  const { search, category, min, max, page = 1 } = params || {};
  const size = 8;
  const skip = (page - 1) * size;

  try {
    await connectDb();
    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      const existsCategory = await Category.findOne({ slug: category });
      if (existsCategory) {
        filter.category = existsCategory._id;
      }
    }
    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    const total = await Product.countDocuments(filter);
    const totalPage = Math.ceil(total / size);
    const products = await Product.find(filter)
      .populate('category')
      .skip(skip)
      .limit(size)
      .sort({ createdAt: -1 })
      .lean();

    if (products.length === 0) {
      return sendResponse(false, 'Product not found! Please try again later');
    }
    return sendResponse(true, 'Products fetched successfully', {
      products,
      totalPage,
    });
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// get single product
export const getSingleProduct = async id => {
  try {
    await connectDb();
    const product = await Product.findOne({ _id: id })
      .populate('category')
      .lean();

    if (!product) {
      return sendResponse(false, 'Product not found!');
    }
    return sendResponse(true, 'Product fetched successfully', product);
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// delete product
export const deleteProduct = async id => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) return sendResponse(false, 'Unauthorized');
    if (user.role !== 'admin') return sendResponse(false, 'Forbidden');

    await connectDb();
    const existsProduct = await Product.findOne({ _id: id });
    if (!existsProduct) {
      return sendResponse(false, 'Product not found! Please try again later');
    }
    const productImages = existsProduct.images;
    if (Array.isArray(productImages) && productImages.length > 0) {
      const res = productImages.map(item =>
        cloudinary.uploader.destroy(item.public_id),
      );
      await Promise.allSettled(res);
    }
    await Product.findOneAndDelete({ _id: id });

    revalidatePath('/admin/products');
    revalidatePath('/shop');

    return sendResponse(true, 'Product deleted successfully');
  } catch (err) {
    console.log(err);
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};
