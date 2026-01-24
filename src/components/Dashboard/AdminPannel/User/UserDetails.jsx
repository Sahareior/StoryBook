import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSiteAdminTeacherDetailQuery } from "../../../../redux/api/authApi";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: teacher, isLoading, error } = useGetSiteAdminTeacherDetailQuery(id);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading teacher details...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error loading teacher details</div>;
  }

  const fullName = (teacher?.first_name || teacher?.last_name)
    ? `${teacher.first_name} ${teacher.last_name}`.trim()
    : teacher?.email;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 mb-6 hover:text-black transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back to Teachers</span>
      </button>

      {/* Teacher Info */}
      <div className="bg-white rounded-xl border p-6 flex flex-col md:flex-row gap-4">
        <div className="w-20 h-20 rounded-full bg-green-900 text-white flex items-center justify-center text-2xl font-bold">
          {fullName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{fullName}</h2>
          <p className="text-sm text-gray-600">Email: {teacher?.email}</p>

          <div className="flex gap-2 mt-2">
            <Badge text={`Grade ${teacher?.grade_level || '-'}`} />
            <Badge text="Teacher" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full mt-6 flex items-center justify-between">
        <div className="flex items-center gap-20">
          <Stat label="Total Students" value="0" />
          <Stat label="Last Activity" value="-" />
        </div>

        <div>
          <label className="font-semibold block mb-2">Assign Grade</label>
          <div className="flex gap-3">
            <div className="w-44 px-4 py-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center">
              <button className="justify-start text-zinc-800 text-sm font-normal">
                Select grade
              </button>
            </div>
            <div className="w-44 px-4 py-3 relative bg-yellow-400 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
              <button className="text-center justify-start text-zinc-800 text-sm font-normal">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dictionary Views - Example section, can be replaced by real teacher data if available */}
      <div className="bg-white border rounded-xl p-6 mt-8">
        <h3 className="text-xl font-semibold">Classes/Students Overview</h3>
        <p className="text-sm text-gray-600 mb-4">
          Overview of classes managed by this teacher
        </p>

        <div className="text-center py-10 text-gray-500">
          No additional data available for this teacher.
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

const Badge = ({ text }) => (
  <span className="px-4 py-1 rounded-full bg-amber-100 text-amber-600 text-sm">
    {text}
  </span>
);

const Stat = ({ label, value }) => (
  <div className="w-44">
    <label className="font-semibold block mb-2">{label}</label>
    <div className="border rounded-lg p-3 bg-white">{value}</div>
  </div>
);

const StoryCard = ({ title, author, grade, pages, rating, image }) => (
  <div className="bg-white border rounded-2xl overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />

    <div className="p-4">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
          Published
        </span>
      </div>

      <p className="text-sm text-gray-600">by {author}</p>

      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <BookOpen size={14} /> {pages} Pages
        </span>
        <span>Grade: {grade}</span>
        <span className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }
            />
          ))}
        </span>
      </div>
    </div>
  </div>
);
