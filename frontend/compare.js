<Route
      path="/"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <RootLayout />
        </Suspense>
      }
    >
      <Route path="counter" element={<Counter />} />
      <Route path="categories/:catname/:subcatname" element={<Items />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="categories" element={<Categories />} />
    </Route>