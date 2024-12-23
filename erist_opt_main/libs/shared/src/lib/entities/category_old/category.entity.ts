// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   BaseEntity,
//   OneToMany,
//   OneToOne,
//   JoinColumn,
//   ManyToOne,
//   ManyToMany,
//   JoinTable,
// } from 'typeorm';
// import { ICategory } from '../../interfaces';
// import { CategoryDescription } from './category_description.entity';

// @Entity()
// export class Category extends BaseEntity implements ICategory {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ default: false })
//   main: boolean;

//   @Column()
//   sortOrder: number;

//   @Column({ default: true })
//   status: boolean;

//   @CreateDateColumn({ type: 'timestamp' })
//   dateAdded: string;

//   @ManyToMany(() => Category, (category) => category.children)
//   @JoinTable()
//   parentCategories: Category[];

//   @ManyToMany(() => Category, (category) => category.parentCategories)
//   @JoinTable()
//   children: Category[];

//   @OneToOne(() => CategoryDescription, { cascade: true })
//   @JoinColumn()
//   description: CategoryDescription;

//   constructor(
//     id: string,
//     main: boolean,
//     parentCategories: Category[],
//     children: Category[],
//     sortOrder: number,
//     status: boolean,
//     dateAdded: string,
//     description: CategoryDescription
//   ) {
//     super();
//     this.id = id;
//     this.main = main;
//     this.parentCategories = parentCategories;
//     this.children = children;
//     this.sortOrder = sortOrder;
//     this.status = status;
//     this.dateAdded = dateAdded;
//     this.description = description;
//   }
// }
