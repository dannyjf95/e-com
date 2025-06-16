import React from "react";
import { Link } from "react-router-dom";
import "./subCategories.css";
export default function SubCategories({ data }) {
  const { catname } = data;

  return (
    <>
      
        {data &&
          data.subCats.map((sub, idx) => {
            return (
              <div className="links">
                <Link key={idx} to={`categories/${catname}/${sub.name}`}>
                  {sub.name}
                </Link>
              </div>
            );
          })}

    </>
  );
}
