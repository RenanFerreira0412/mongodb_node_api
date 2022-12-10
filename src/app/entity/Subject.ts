import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
class Subject {

    @ObjectIdColumn()
    id: ObjectID

    @Column('text')
    name: String

    @Column('text', { nullable: true })
    teacher: String

}

export default Subject;