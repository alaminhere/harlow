'use server';

import slugify from 'slugify';
import connectDb from '@/libs/connectDb';
import cloudinary from '@/libs/cloudinary';
import { revalidatePath } from 'next/cache';
import uploadImage from '@/libs/uploadImage';
import { Category } from '@/models/categorySchema';
import { sendResponse } from '@/libs/sendResponse';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/authOptions';

// submit category
export const submitCategory = async (prevData, formData) => {
  const file = formData.get('file');
  const title = formData.get('title');

  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) return sendResponse(false, 'Unauthorized');
    if (user.role !== 'admin') return sendResponse(false, 'Forbidden');

    if (!title || !file || file.size === 0) {
      return sendResponse(false, 'Please fill in all required fields!');
    }
    const slug = slugify(title, { lower: true, strict: true });

    await connectDb();
    const exists = await Category.findOne({ slug });
    if (exists) {
      return sendResponse(false, 'Category already exists');
    }
    const image = await uploadImage(file);

    await Category.create({
      title: title,
      image: image,
      slug: slug,
    });

    revalidatePath('/admin/categories');
    return sendResponse(true, 'Category submitted successfully');
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// get category
export const getCategory = async () => {
  try {
    await connectDb();
    const category = await Category.find();
    return sendResponse(true, 'Categories fetched successfully', category);
  } catch (err) {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// delete category
export const deleteCategory = async slug => {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) return sendResponse(false, 'Unauthorized');
    if (user.role !== 'admin') return sendResponse(false, 'Forbidden');

    await connectDb();
    const existsCategory = await Category.findOne({ slug: slug });
    if (!existsCategory) {
      return sendResponse(false, 'Category not found! Please try again later');
    }

    const public_id = existsCategory.image?.public_id;
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    await Category.findOneAndDelete({ slug: slug });
    revalidatePath('/admin/categories');

    return sendResponse(true, 'Category deleted successfully');
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};
