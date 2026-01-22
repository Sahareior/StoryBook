import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // === LOGIN ===
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    // === SITE OVERVIEW ===
    getSiteOverview: builder.query({
      query: () => ({
        url: "/site/overview/",
        method: "GET",
      }),
    }),
    }),
});
export const {
  useLoginMutation,
  useGetSiteOverviewQuery,
} = authApi;
