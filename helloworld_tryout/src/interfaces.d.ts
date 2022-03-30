interface IPost {
  title: string;
  createdAt: string;
  category: ICategory;
}

interface ICategory {
  id: string;
  title: string;
}
