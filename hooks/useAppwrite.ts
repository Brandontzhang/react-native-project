import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

const useAppwrite = (callback: () => Promise<Models.Document[]>) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await callback();
    setData(response!);
    setLoading(false);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = async () => {
    fetchData();
  }

  return {
    data,
    loading,
    refetch,
  }
}

export default useAppwrite;
