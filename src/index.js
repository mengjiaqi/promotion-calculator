import Logistics from './logistics';
import Product from './product';
import { Coupon, ReduceOnce, ReduceRepeat } from './promotion';

const sf = new Logistics('sf', 23, 10, 1, 0.7);
const product = new Product('黑虎虾', 138, 40, 1, 1, sf);
// const product = new Product('白虾', 118, 65, 0, 2, sf);

const promotions = product.generatePromotions();

promotions.forEach(({n, price, condition, denomination}) => {
  console.log(n, price, `${condition}-${denomination}`);
});
