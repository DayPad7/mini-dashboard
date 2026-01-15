import { useState, useEffect } from "react";
import axios from "axios";
import type { UserEvent } from "../types/types";
import { subDays, addDays } from "date-fns";
import type { EventType } from "../types/types";

const useEvents = () => {
  const [data, setData] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeStatus = (
    status: string
  ): "success" | "pending" | "failed" => {
    switch (status) {
      case "sucess": //typo from the API
        return "success";
      case "pending":
      case "failed":
      case "success":
        return status;
      default:
        return "pending";
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://dummyjson.com/users?limit=400");

        const events: UserEvent[] = res.data.users.map((user: UserEvent) => {
          const rawStatus = ["sucess", "pending", "failed"][
            Math.floor(Math.random() * 3)
          ];

          return {
            id: user.id,
            type: ["login", "logout", "update", "purchase"][
              Math.floor(Math.random() * 4)
            ] as EventType,
            status: normalizeStatus(rawStatus),
            user: `${user.firstName} ${user.lastName}`,
            createdAt: addDays(
              subDays(new Date(), Math.floor(Math.random() * 30)),
              Math.floor(Math.random() * 30)
            ).toISOString(),
            amount: Math.floor(Math.random() * 1000),
          };
        });

        setData(events);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { data, loading, error, retry: () => setData([]) };
};
export default useEvents;
