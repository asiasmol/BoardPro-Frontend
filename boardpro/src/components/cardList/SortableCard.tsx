import {CSS} from '@dnd-kit/utilities';
import {useSortable} from '@dnd-kit/sortable';
import CardComponent from "../card/CardComponent";
import {CardListResponse} from "../../api/apiModels/CardListResponse";
import {CardResponse} from "../../api/apiModels/CardResponse";
interface SortableCardProps {
    id: string;
    card: CardResponse;
    cardList: CardListResponse
}

const SortableCard: React.FC<SortableCardProps> = ({id, card, cardList}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id});


    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.5 : 1,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <CardComponent cardList={cardList} card={card}></CardComponent>
        </div>
    );
};

export default SortableCard;