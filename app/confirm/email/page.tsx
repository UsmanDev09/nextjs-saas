import EmailVerification from "@/components/emailVerification";
interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
  }
const confirmEmail =({ searchParams }: PageProps)=>{
    const userId = searchParams.userId as string;
    const token = searchParams.token as string;
    return(
        <>
        <EmailVerification userId={"eac5205e-fc15-4262-8bcb-ddf8c5047673"} token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc3MjE4NTIsImV4cCI6MTcyNzcyNTQ1Mn0.Xy2wM7UipkrFJg7ZpSVyVlBFlhkyhmplVHG9x6dN-fQ"}/>
        </>
    )
}
export default confirmEmail;