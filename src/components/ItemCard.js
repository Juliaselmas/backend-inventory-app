function ItemCard({ item }) {
    return (
      <div className="item-card">
        <div className="item-card__title">{item.name}</div>
        <p className="item-card__detail">
          <span className="item-card__label">Description:</span> {item.description}
        </p>
        <p className="item-card__detail">
          <span className="item-card__label">Quantity:</span> {item.quantity}
        </p>
        <p className="item-card__detail">
          <span className="item-card__label">Category:</span> {item.category}
        </p>
      </div>
    );
  }
  
  export default ItemCard

  /*
   name         String
  description  String
  quantity     Int
  category     String
  */