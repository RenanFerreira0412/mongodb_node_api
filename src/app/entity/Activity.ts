import { Entity, ObjectIdColumn, ObjectID, Column, ManyToOne, JoinColumn } from "typeorm"

import Subject  from "./Subject";
@Entity()
class Activity {

    @ObjectIdColumn()
    id: ObjectID

    @Column('text')
    name: string

    @Column('date')
    deadline: Date;

    @Column('date', { default: () => 'CURRENT_TIMESTAMP' })
    currentDate: Date;

    @ManyToOne(type => Subject)
    @JoinColumn({ name: "subject_id", referencedColumnName: "id" })
    endereco: Subject;
}

export default Activity;
