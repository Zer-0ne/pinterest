"use client"
import Loading from "@/Components/Loading";
import MasonryList from "@/Components/MasonaryList";
import React from "react";

export default function Home() {
  const [data, setData] = React.useState<any[]>([])
  const fetchData = async () => {
    try {
      const response = await fetch('/api/pins', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        const sortedData = await responseData.Pin?.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        // setBlogData(sortedData?.reverse())
        setData((prevData) => ([
          // ...prevData,
          ...sortedData?.reverse()
        ]));
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);

    }
  }
  React.useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [])
  if (!data.length) {
    return <Loading />
  }
  return (
    <>
      <MasonryList
        fetchData={fetchData}
        data={data}
      />
    </>
  )
}
