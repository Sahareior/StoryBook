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
      providesTags: ["Students"],
    }),
    // === Admin Students Detail ===
    getSiteAdminStudentDetail: builder.query({
      query: (id) => ({
        url: `/site/admin/students/${id}/`,
        method: "GET",
      }),
    }),
    // === Admin Students Add ===
    addSiteAdminStudent: builder.mutation({
      query: (data) => ({
        url: "/site/admin/students/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Students"],
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
    // === Admin Teacher Add ===
    addSiteAdminTeacher: builder.mutation({
      query: (data) => ({
        url: "/site/admin/teachers/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teachers"],
    }),
    // === Admin AI Assistant Settings ===
    getSiteAdminAiAssistantSettings: builder.query({
      query: () => ({
        url: "/site/config/ai/behavior/",
        method: "GET",
      }),
      providesTags: ["AI Assistant Settings"],
    }),
    // === Admin AI Assistant Settings Update ===
    updateSiteAdminAiAssistantSettings: builder.mutation({
      query: (data) => ({
        url: "/site/config/ai/behavior/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AI Assistant Settings"],
    }),
  }),
});
export const {
  useLoginMutation,
  useGetSiteOverviewQuery,
  useGetSiteAdminStudentsOverviewQuery,
  useGetSiteAdminStudentDetailQuery,
  useAddSiteAdminStudentMutation,
  useGetSiteAdminTeachersOverviewQuery,
  useGetSiteAdminTeacherDetailQuery,
  useAddSiteAdminTeacherMutation,
  useGetSiteAdminAiAssistantSettingsQuery,
  useUpdateSiteAdminAiAssistantSettingsMutation,
} = authApi;
