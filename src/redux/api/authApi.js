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
    // === Admin Students Detail ===
    getSiteAdminStudentDetail: builder.query({
      query: (id) => ({
        url: `/site/admin/students/${id}/`,
        method: "GET",
      }),
    }),
    // === Admin Teachers Overview ===
    getSiteAdminTeachersOverview: builder.query({
      query: () => ({
        url: "/site/admin/teachers/",
        method: "GET",
      }),
    }),
    // === Admin Teachers Detail ===
    getSiteAdminTeacherDetail: builder.query({
      query: (id) => ({
        url: `/site/admin/teachers/${id}/`,
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
  useGetSiteAdminTeachersOverviewQuery,
  useGetSiteAdminTeacherDetailQuery,
} = authApi;
