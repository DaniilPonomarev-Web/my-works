interface Description {
  name: string;
  description: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
  meta_keyword: string;
}

interface Category {
  id: string;
  image: string;
  parent_id: string | null;
  sort_order: number;
  status: boolean;
  descriptions: Description[];
  children?: Category[];
}

export const mockMenu: { data: { getCategoryTree: Category[] } } = {
  data: {
    getCategoryTree: [
      {
        id: 'f8e3db47-ff4b-4672-93f3-79fe8fcb7359',
        image: 'new_image_path.jpg',
        parent_id: null,
        sort_order: 2,
        status: false,
        descriptions: [
          {
            name: 'Имя главной категории',
            description: 'Updated Description',
            meta_title: 'Updated Meta Title',
            meta_h1: 'Updated Meta H1',
            meta_description: 'Updated Meta Description',
            meta_keyword: 'Updated Meta Keyword',
          },
        ],
        children: [
          {
            id: 'bf224ae4-f0d6-4564-923b-e35c3d40cf52',
            image: 'image_path.jpg',
            parent_id: 'f8e3db47-ff4b-4672-93f3-79fe8fcb7359',
            sort_order: 2,
            status: true,
            descriptions: [
              {
                name: 'ПОдкатегория',
                description: 'CategoryDescription',
                meta_title: 'MetaTitle',
                meta_h1: 'MetaH1',
                meta_description: 'MetaDescription',
                meta_keyword: 'MetaKeyword',
              },
            ],
            children: [
              {
                id: '4ff935ce-ad5c-4118-82b3-e8897ca16bfb',
                image: 'image_path.jpg',
                parent_id: 'bf224ae4-f0d6-4564-923b-e35c3d40cf52',
                sort_order: 2,
                status: true,
                descriptions: [
                  {
                    name: 'ПОдкатегория',
                    description: 'CategoryDescription',
                    meta_title: 'MetaTitle',
                    meta_h1: 'MetaH1',
                    meta_description: 'MetaDescription',
                    meta_keyword: 'MetaKeyword',
                  },
                ],
              },
            ],
          },
          {
            id: 'e52b0f71-ee5d-4a1c-8df5-f6afd4fbc6c0',
            image: 'image_path.jpg',
            parent_id: 'f8e3db47-ff4b-4672-93f3-79fe8fcb7359',
            sort_order: 2,
            status: true,
            descriptions: [
              {
                name: 'ПОдкатегория',
                description: 'CategoryDescription',
                meta_title: 'MetaTitle',
                meta_h1: 'MetaH1',
                meta_description: 'MetaDescription',
                meta_keyword: 'MetaKeyword',
              },
            ],
          },
          {
            id: 'd0ca25c4-ec74-4c9d-9898-ace11e527a0c',
            image: 'image_path.jpg',
            parent_id: 'f8e3db47-ff4b-4672-93f3-79fe8fcb7359',
            sort_order: 2,
            status: true,
            descriptions: [
              {
                name: 'ПОдкатегория',
                description: 'CategoryDescription',
                meta_title: 'MetaTitle',
                meta_h1: 'MetaH1',
                meta_description: 'MetaDescription',
                meta_keyword: 'MetaKeyword',
              },
            ],
          },
          {
            id: '4337c4cd-c82e-493b-bd7c-8f92153f702e',
            image: 'image_path.jpg',
            parent_id: 'f8e3db47-ff4b-4672-93f3-79fe8fcb7359',
            sort_order: 2,
            status: true,
            descriptions: [
              {
                name: 'ПОдкатегория',
                description: 'CategoryDescription',
                meta_title: 'MetaTitle',
                meta_h1: 'MetaH1',
                meta_description: 'MetaDescription',
                meta_keyword: 'MetaKeyword',
              },
            ],
          },
        ],
      },
      {
        id: '85da3fa3-3493-40d4-a194-9fed1c15c5c0',
        image: 'image_path.jpg',
        parent_id: null,
        sort_order: 1,
        status: true,
        descriptions: [
          {
            name: 'Category Name',
            description: 'Category Description',
            meta_title: 'Meta Title',
            meta_h1: 'Meta H1',
            meta_description: 'Meta Description',
            meta_keyword: 'Meta Keyword',
          },
        ],
        children: [],
      },
      {
        id: '66e84f9d-de2a-4902-907a-529321f66b82',
        image: 'image_path.jpg',
        parent_id: null,
        sort_order: 1,
        status: true,
        descriptions: [
          {
            name: 'Category Name',
            description: 'Category Description',
            meta_title: 'Meta Title',
            meta_h1: 'Meta H1',
            meta_description: 'Meta Description',
            meta_keyword: 'Meta Keyword',
          },
        ],
        children: [],
      },
      {
        id: '0b348425-e29f-4881-adaf-497d49a99000',
        image: 'image_path.jpg',
        parent_id: null,
        sort_order: 1,
        status: true,
        descriptions: [
          {
            name: 'Category Name',
            description: 'Category Description',
            meta_title: 'Meta Title',
            meta_h1: 'Meta H1',
            meta_description: 'Meta Description',
            meta_keyword: 'Meta Keyword',
          },
        ],
        children: [],
      },
    ],
  },
};
