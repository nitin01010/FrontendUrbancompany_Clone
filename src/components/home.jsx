import { ArrowLeft } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/api";
import LoadingSkeleton from "./loadingSkeleton";
import ErrorMessage from "./errorMessage";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchData(`${baseUrl}/dapi/services/list`),
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });

    if (error?.message) {
        return <ErrorMessage error={error} />
    }

    if (isLoading) {
        return <LoadingSkeleton />
    }


    return (
        <div className=" w-full">

            <div className="flex flex-col md:flex-row justify-center py-2 px-2 gap-10 mt-10 w-full md:w-[82%] mx-auto">
                {/* Left Section */}
                <div className="w-full md:w-1/2 bg-white">
                    <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-orange-600 to-orange-900">
                        Home services at your <br />
                        doorstep <span>Just in <span className="text-blue-700 font-bold">10 Mintues</span></span>
                    </p>



                    <div className="border mt-8 border-gray-200 p-3 rounded">
                        <p className="text-sm text-gray-400 py-2 underline decoration-wavy">
                            {data[0]?.name}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-5">
                            {data[0]?.serviceList?.map((item, id) => (
                                <div key={id} className="bg-white cursor-pointer p-3 rounded-md border border-gray-200 min-h-20 text-center">
                                    <img src={item.icons} className="w-8 mx-auto mb-5" alt={item.category} />
                                    <p className="text-xs">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 bg-amber-300 py-10 px-5 md:px-10 rounded">
                    <img
                        className="object-contain w-full max-h-[300px] mx-auto"
                        src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png"
                        alt="not-found"
                    />
                </div>
            </div>

            <div className="MainContainer flex p-1 sm:p-0  w-full mt-20 m-auto md:w-[81%] mb-5 gap-6   overflow-x-scroll ">
                {
                    data[0]?.srcollBar_Service.map((item, idx) => {
                        return (
                            <Link to="/service/Ac_repare/12819192189" key={idx}>
                                <img src={item.url} className=" object-cover min-w-[380px]   sm:w-[394px] h-[222px]  sm:min-w-[394px] rounded-md  bg-[#f2f2f2]" />
                            </Link>
                        )
                    })
                }
            </div>

            <div className="w-full m-auto mb-0 md:mb-10 md:w-[81%]">
                <p className="text-2xl mb-5 sm:py-5  p-1 sm:p-0 md:py-5  md:mb-8 sm:text-lg md:text-3xl ">
                    Most booked services
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-5 p-2 sm:p-0 place-content-around ">
                    {
                        data[0]?.Most_booked_services.map((item) => {
                            return (
                                <div key={item._id}>
                                    <ServiceCard id={item._id} item={item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home