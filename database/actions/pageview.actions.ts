"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Pageview from "../models/pageview.model";

export const getPageViews = async (companyId: string) => {
  try {
    await connectToDatabase();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 8); // Ensures capture of full 7 days plus the current day

    const companyPage = await Pageview.findOne({ companyId });
    if (companyPage) {
      const weeklyViews = companyPage.views.filter(
        (view: any) => view.date > oneWeekAgo
      );
      return weeklyViews.length; // This is the number of views in the last week
    } else {
      return 0;
    }
  } catch (error: any) {
    handleError(error);
    return 0;
  }
};

export const incrementPageView = async (companyId: string) => {
  try {
    await connectToDatabase();

    const update = {
      $push: { views: { date: new Date() } },
      $inc: { viewCount: 1 },
    };

    const options = { upsert: true, new: true };

    await Pageview.findOneAndUpdate({ companyId: companyId }, update, options);
  } catch (error: any) {
    handleError(error);
  }
};
