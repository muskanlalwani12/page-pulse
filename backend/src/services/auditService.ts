import axios from "axios";
import * as cheerio from "cheerio";

export const auditPage = async (url: string) => {
  try {
    const startTime = Date.now();

    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
      },
    });

    const responseTime = Date.now() - startTime;

    const contentType = response.headers["content-type"] ?? "";

    if (!contentType.includes("text/html")) {
      throw new Error("Only HTML pages are supported.");
    }

    const $ = cheerio.load(response.data);

    const title = $("title").text().trim();

    const metaDescription =
      $('meta[name="description"]').attr("content")?.trim() || "";

    const h1Count = $("h1").length;

    const imagesWithoutAlt = $("img")
      .filter((_, element) => !$(element).attr("alt"))
      .length;

    const wordCount = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean).length;

    return {
      status: response.status,
      responseTime,
      title,
      metaDescription,
      h1Count,
      imagesWithoutAlt,
      wordCount,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
      throw new Error("Request Timed Out");
    }

    throw error;
  }
};