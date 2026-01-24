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
    // === Admin Students Overview ===
    getSiteAdminStudentsOverview: builder.query({
      query: () => ({
        url: "/site/admin/students/",
        method: "GET",
      }),
    }),
    getSiteAdminStudentDetail: builder.query({
      query: (id) => ({
        url: `/site/admin/students/${id}/`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useGetSiteOverviewQuery,
  useGetSiteAdminStudentsOverviewQuery,
  useGetSiteAdminStudentDetailQuery,
} = authApi;
