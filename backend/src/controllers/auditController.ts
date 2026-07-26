import { Request, Response } from "express";
import { auditPage } from "../services/auditService";
import { isValidUrl } from "../utils/urlValidator";

export const auditWebsite = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({
        success: false,
        message: "URL is required",
      });
      return;
    }

    if (!isValidUrl(url)) {
      res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
      return;
    }

    const report = await auditPage(url);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Only HTML pages are supported.") {
        res.status(415).json({
          success: false,
          message: error.message,
        });
        return;
      }
    }

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};