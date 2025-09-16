import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./categoriesThunk";
import { selectCategories } from "./categoriesSlice";
// import SubCategories from "../subCategories/SubCategories";
import Category from "../category/Category";
import "./categories.css";
import DropDown from "../../components/dropdown/DropDown";
export default function Categories() {
  const [visible, setVisible] = useState(true);
  const [curCat, setCurCat] = useState('');
  const dispatch = useDispatch();
  const { categories, categoriesFetchLoading, categoriesFetchError } = useSelector(selectCategories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const data = categories.rows && categories.rows.find((cat) => cat.name === curCat);
  
  return (
    <>
      <div className="cat-container">
        <div className="categories">
          {categories.rows &&
            categories.rows.map((category, idx) => {
              return (
                <Category
                  key={idx}
                  category={category}
                  visible={visible}
                  setVisible={setVisible}
                  curCat={curCat}
                  setCurCat={setCurCat}
                />
              );
            })}
        </div>
        {visible && (
          <div className="dropdown-container"  onMouseLeave={() => setVisible(false)}>
            {visible && <DropDown data={data} curCat={curCat} />}
          </div>
        )}
      </div>
    </>
  );
}
