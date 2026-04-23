import TeamLeaderLayout from "@/components/TeamLeaderLayout";

export const metadata = {
  title: {
    default: 'ASTU Staff Performance Evaluator',
    absolute: 'ASTU Staff Evaluation',
  },
  description: "Formed by ASTU Civil and Service",
};

export default function AdminLayout({ children }) {
  return (
    <TeamLeaderLayout>
      {children}
    </TeamLeaderLayout>
  )
}
