import TopContent from "../components/top_content";

export default function Page({ params }: { params: { id: string } }) {
  return <>
  <div className="p-6">
  <TopContent project_id={params.id}/>
  </div>
  </>

}