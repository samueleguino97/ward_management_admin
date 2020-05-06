import { useEffect, useState } from "react";
import { produce } from "immer";
import { useDispatch, useSelector } from "react-redux";
import {
  createItem,
  updateItem,
  deleteItem,
  setCollection,
} from "../redux/reducers";
export function useItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://167.172.129.113:8085/api/items")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  const actions = {
    createItem: async (item) => {
      const result = await fetch("http://167.172.129.113:8085/api/items", {
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
      await fetch(
        "http://167.172.129.113:8085/api/items/" + id + "?_id=" + id,
        {
          method: "DELETE",
        }
      );
    },
  };

  return [items, actions];
}

export function useMovements() {
  const [movements, setMovements] = useState([]);
  useEffect(() => {
    fetch("http://167.172.129.113:8085/api/movements")
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
      await fetch(
        "http://167.172.129.113:8085/api/movements/" + id + "?_id=" + id,
        {
          method: "DELETE",
        }
      );
    },
  };

  return [movements, actions];
}

export function useDbCollection(collection = "") {
  const data = useSelector((state) => state[collection]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`http://167.172.129.113:8085/api/${collection}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setCollection({ collection, data: json }));
      });
  }, []);

  const actions = {
    createItem: async (item) => {
      const result = await fetch(
        `http://167.172.129.113:8085/api/${collection}`,
        {
          method: "POST",
          body: JSON.stringify({ ...item }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      dispatch(
        createItem({ collection, data: { ...item, _id: result.insertedId } })
      );
    },
    updateitem: async (item) => {
      dispatch(updateItem({ collection, data: item, id: item._id }));

      await fetch(
        `http://167.172.129.113:8085/api/${collection}/` +
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
      dispatch(deleteItem({ collection, id }));

      await fetch(
        `http://167.172.129.113:8085/api/${collection}/` + id + "?_id=" + id,
        {
          method: "DELETE",
        }
      );
    },
  };

  return [data, actions];
}
