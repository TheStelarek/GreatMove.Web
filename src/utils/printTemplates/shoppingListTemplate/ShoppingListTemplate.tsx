import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { Ingredient } from '@/utils/types/Ingredient';

type ShoppingListTemplateProps = {
  products: Array<Ingredient[]>;
};

Font.register({
  family: `Nunito`,
  src: `./fonts/nunito-Regular.ttf`,
});
Font.register({
  family: `Nunito-bold`,
  src: `./fonts/nunito-bold.ttf`,
});

export const styles = StyleSheet.create({
  shoppingListWrapper: {
    fontFamily: `Nunito`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    justifyContent: `flex-start`,
    padding: `30pt 40pt`,
  },
  title: {
    fontFamily: `Nunito-bold`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    fontSize: `38pt`,
    color: `#28b3e2`,
  },
  secondPart: {
    fontFamily: `Nunito`,
  },
  productsList: {
    display: `flex`,
    marginTop: `5pt`,
    flexDirection: `column`,
    maxWidth: `100%`,
  },
  product: {
    color: `#9d9595`,
    fontSize: `14pt`,
  },
});

const ShoppingListTemplate = ({ products }: ShoppingListTemplateProps) => (
  <Document>
    {products.length > 0 &&
      products.map((productsPart, partIndex) => (
        <Page size="A4" key={productsPart[0].id}>
          <View style={styles.shoppingListWrapper}>
            <View style={styles.title}>
              <Text>Shopping</Text>
              <Text style={styles.secondPart}>List</Text>
            </View>
            <View style={styles.productsList}>
              {productsPart.map(({ id, name, weight }, index) => (
                <Text key={id} style={styles.product}>{`${
                  partIndex * 30 + index + 1
                }. ${name}  -  ${weight} g `}</Text>
              ))}
            </View>
          </View>
        </Page>
      ))}
  </Document>
);

export default ShoppingListTemplate;
