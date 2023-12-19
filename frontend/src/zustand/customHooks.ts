import { StoreApi, create, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskListState {
  activeTaskCreation: boolean;
  activeTaskCreationChange: () => void;
}

type UserId = {
  userid: number | null;
  updateUserId: (userid: number | null) => void;
  removeUserId: () => void;
};

type TaskList = {
  taskList: boolean;
  updateTaskListState: () => void;
};

interface Task {
  taskname: string;
  taskdescription: string;
  category: string;
  createdby: string;
  taskcreateddate: string;
  taskid: number;
  taskpriority: string;
  taskstatus: string;
}

interface TaskListArray {
  tasks: Task[];

  updateTaskListArray: (tasks: Task[]) => void;
}

export interface ShoppingCartItems {
  data: {
    category_id: string;
    description: string;
    image_id: number;
    image_ref: number;
    product_id: number;
    price: number;
    product_name: string;
    stock_quantity: number;
    upload_date: string;
    user_id: number;
    username: string;
  };
  image: string;
}

export interface ShoppingCartState {
  data: ShoppingCartItems[];
  updateShoppingCart: (product: ShoppingCartItems) => void;
  removeFromCart: (productId: string) => void;
}

export const useShoppingCartItems = create(
  persist(
    set => ({
      data: [],
      updateShoppingCart: (product: ShoppingCartItems) =>
        set((state: ShoppingCartState) => ({
          ...state,
          data: [...state.data, product],
        })),
      removeFromCart: (productId: number) =>
        set((state: ShoppingCartState) => {
          const index = state.data.findIndex(
            item => item.data.product_id === productId
          );
          if (index !== -1) {
            const newData = [...state.data];
            newData.splice(index, 1);
            return { ...state, data: newData };
          }
          return state;
        }),
    }),
    {
      name: 'shoppingCartItems', // unique name
    }
  )
);
