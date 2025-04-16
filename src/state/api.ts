import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  try {
    /* Anytime we hit an endpoint like getCourses or getCourse call, it's going to run through this customBaseQuery and it's going to apply it to every single endoint so we can modify it to whatever we want. */
    const result: any = await baseQuery(args, api, extraOptions);

    /* Remove the message to only have array of objects of our course */
    if (result.data) {
      result.data = result.data.data;
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown  error";
    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery, // Anytime we create an api request, this is the base url that we're going to be using.
  reducerPath: "api",
  /* Represent the data that we receive from the backend. When we do getCourses we're getting a list of courses and we're saving it to a tag of Courses. This will be important when we do invalidation of courses. */
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    /* The first argument Course[] is what we're going to receive from the backend, and what we need to send is going to be on the second argument. */
    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        /* The url here, well ba tacked on to the NEXT_PUBLIC_API_BASE_URL */
        url: "courses",
        params: { category },
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      /* When we grab the course, we're going to find the type of courses for the tags, but we're going to find one that has the exact ID of the getCourse. The reason why we need to specify this is so that if we grab a course individually, it's going to update the courses value automatically on the frontend. When we grab a list of courses(getCourses) and we call getCourse it's going to update that specific course in the Courses tag. It's a way of doing invalidation that makes life easier. This is similar to reactQuery.*/
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = api;
