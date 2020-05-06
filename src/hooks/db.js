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

export function useDbCollection(collection = "") {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8085/api/${collection}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json || []);
      });
  }, []);

  const actions = {
    createItem: async (item) => {
      const result = await fetch(`http://127.0.0.1:8085/api/${collection}`, {
        method: "POST",
        body: JSON.stringify({ ...item }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setData([...data, { ...item, _id: result.insertedId }]);
    },
    updateitem: async (item) => {
      setData(
        produce(data, (draft) => {
          const index = draft.findIndex((item2) => item2._id === item._id);
          draft[index] = item;
        })
      );
      await fetch(
        `http://127.0.0.1:8085/api/${collection}/` +
          item._id +
          "?_id=" +
          item._id,
        {
          method: "PUT",
          body: JSON.stringify({ ...item }),
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    deleteItem: async (id) => {
      setData(
        produce(data, (draft) => {
          const index = draft.findIndex((item) => item._id === id);
          draft.splice(index, 1);
        })
      );
      await fetch(
        `http://127.0.0.1:8085/api/${collection}/` + id + "?_id=" + id,
        {
          method: "DELETE",
        }
      );
    },
  };

  return [data, actions];
}
