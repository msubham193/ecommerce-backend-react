class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  /// Rating Filter====Products
  sort() {
    const sortBy = this.queryStr.sortBy;

    console.log(sortBy + " sort");
    if (sortBy === "hightolow") {
      this.query = this.query.sort({ price: -1 });
      return this;
    } else if (sortBy === "lowtohigh") {
      this.query = this.query.sort({ price: 1 });
      return this;
    }
    return this;
  }
  ratingFilter() {
    const rating = this.queryStr.rating;

    // console.log(rating + "rating");
    if (rating) {
      this.query = this.query.find({ ratings: { $gte: rating } });
      return this;
    }
    return this;
  }

  ////FILTER BY COLOR ==== PRODUCTS

  ////FILTER BY SIZE ==== PRODUCTS
  sizeFilter() {
    const size = this.queryStr.size;

    this.query = this.query.find({ ...size });
    return this;
  }

  colorFilter() {
    const Color = this.queryStr.color
      ? {
          color: {
            $regex: this.queryStr.color,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...Color });

    return this;
  }

  ////SEARCHING THE PRODUCTS ==== PRODUCTS
  search() {
    const keyword = this.queryStr.keyword
      ? {
          // name: {
          //   $regex: this.queryStr.keyword,
          //   $options: "i",
          // },
          description: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}
module.exports = ApiFeatures;
