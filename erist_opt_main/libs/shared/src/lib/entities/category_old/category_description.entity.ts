// import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
// import { ICategoryDescription } from '../../interfaces';

// @Entity()
// export class CategoryDescription implements ICategoryDescription {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column({ nullable: true })
//   imageUrl: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column({ nullable: true })
//   metaTitle: string;

//   @Column({ nullable: true })
//   metaH1: string;

//   @Column({ nullable: true })
//   metaDescription: string;

//   constructor(
//     id: string,
//     imageUrl: string,
//     name: string,
//     description: string,
//     metaTitle: string,
//     metaH1: string,
//     metaDescription: string
//   ) {
//     this.id = id;
//     this.imageUrl = imageUrl;
//     this.name = name;
//     this.description = description;
//     this.metaTitle = metaTitle;
//     this.metaH1 = metaH1;
//     this.metaDescription = metaDescription;
//   }
// }
