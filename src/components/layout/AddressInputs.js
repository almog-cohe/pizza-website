function AddressInputs({ addressProps, setAddressProps }) {
  const { phone, srteetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label>Phone number</label>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setAddressProps("phone", e.target.value)}
      />
      <label>Street address</label>
      <input
        type="text"
        placeholder="Street address"
        value={srteetAddress}
        onChange={(e) => setAddressProps("srteetAddress", e.target.value)}
      />
      <div className="flex gap-2">
        <div>
          <label>Postal code</label>
          <input
            type="text"
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setAddressProps("city", e.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setAddressProps("country", e.target.value)}
      />
    </>
  );
}
export default AddressInputs;
