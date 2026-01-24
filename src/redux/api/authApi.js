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
    // === Admin General Settings ===
    getSiteAdminGeneralSettings: builder.query({
      query: () => ({
        url: "/site/config/platform/",
        method: "GET",
      }),
      providesTags: ["General Settings"],
    }),
    // === Admin General Settings Update ===
    updateSiteAdminGeneralSettings: builder.mutation({
      query: (data) => ({
        url: "/site/config/platform/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["General Settings"],
    }),
    // === Admin Terms & Conditions ===
    getSiteAdminTermsAndConditions: builder.query({
      query: () => ({
        url: "/site/config/terms-and-conditions/",
        method: "GET",
      }),
      providesTags: ["Terms & Conditions"],
    }),
    // === Admin Terms & Conditions Update ===
    updateSiteAdminTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/site/config/terms-and-conditions/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terms & Conditions"],
    }),
    // === Admin Privacy Policy ===
    getSiteAdminPrivacyPolicy: builder.query({
      query: () => ({
        url: "/site/config/privacy-and-policy/",
        method: "GET",
      }),
      providesTags: ["Privacy Policy"],
    }),
    // === Admin Privacy Policy Update ===
    updateSiteAdminPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/site/config/privacy-and-policy/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Privacy Policy"],
    }),

    // Teacher Panel
    // === Teacher Dashboard ===
    getTeacherDashboard: builder.query({
      query: () => ({
        url: "/teachers/dashboard/",
        method: "GET",
      }),
      providesTags: ["Teacher Dashboard"],
    }),
    // === All Students List ===
    getAllStudentsList: builder.query({
      query: () => ({
        url: "/teachers/all/students/",
        method: "GET",
      }),
      providesTags: ["Students"],
    }),
    // === Add Student ===
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/teachers/all/students/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Students"],
    }),
    // === Student Detail ===
    getStudentDetail: builder.query({
      query: (id) => ({
        url: `/teachers/students/${id}/action/`,
        method: "GET",
      }),
      providesTags: ["Student Detail"],
    }),
    // === Update Student ===
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `/teachers/students/${data.id}/action/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Students"],
    }),
    // === Delete Student ===
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/teachers/students/${id}/action/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
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
  useGetSiteAdminGeneralSettingsQuery,
  useUpdateSiteAdminGeneralSettingsMutation,
  useGetSiteAdminTermsAndConditionsQuery,
  useUpdateSiteAdminTermsAndConditionsMutation,
  useGetSiteAdminPrivacyPolicyQuery,
  useUpdateSiteAdminPrivacyPolicyMutation,
  useGetTeacherDashboardQuery,
  useGetAllStudentsListQuery,
  useAddStudentMutation,
  useGetStudentDetailQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = authApi;
