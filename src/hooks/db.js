import { useEffect, useState } from "react";
import { produce } from "immer";
export function useItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8085/api/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  const actions = {
    createItem: async (item) => {
      const result = await fetch("http://127.0.0.1:8085/api/items", {
        method: "POST",
        body: JSON.stringify({ ...item }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setItems([...items, { ...item, _id: result.insertedId }]);
    },
    deleteItem: async (id) => {
      setItems(
        produce(items, (draft) => {
          const index = draft.findIndex((item) => item._id === id);
          draft.splice(index, 1);
        })
      );
      await fetch("http://127.0.0.1:8085/api/items/" + id + "?_id=" + id, {
        method: "DELETE",
      });
    },
  };

  return [items, actions];
}

export function useMovements() {
  const [movements, setMovements] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8085/api/movements")
      .then((res) => res.json())
      .then((json) => {
        setMovements(json);
      });
  }, []);

  const actions = {
    deleteMovement: async (id) => {
      setMovements(
        produce(movements, (draft) => {
          const index = draft.findIndex((item) => item._id === id);
          draft.splice(index, 1);
        })
      );
      await fetch("http://127.0.0.1:8085/api/movements/" + id + "?_id=" + id, {
        method: "DELETE",
      });
    },
  };

  return [movements, actions];
}
