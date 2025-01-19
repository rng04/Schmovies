import PageHeader from "./PageHeader"

export default function AppPage({title,content}) {
    return (
        <div className="m-7">
            <PageHeader content={title}/>
            {content}
        </div>
    )
}