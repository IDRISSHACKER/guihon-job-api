import { Client } from '../client/entities/client.entity';
import { Image } from '../image/entities/image.entity';
export default interface ClientRestInterface extends Client {
    images: Array<Image>;
}
