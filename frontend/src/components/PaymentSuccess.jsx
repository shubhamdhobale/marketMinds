import { useSearchParams } from "react-router-dom"

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0]

  const referanceNum = searchQuery.get("referance");
  console.log(referanceNum)

  return (
    <div className="flex flex-col items-center justify-center gap-2 top-32 h-[100vh]">
      <h1>Payment Successfull</h1>
      <p>Referance Id:- {referanceNum}</p>
    </div>
  )
}

export default PaymentSuccess