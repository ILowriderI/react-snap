import ContentLoader from "react-content-loader"

const SkeletonProductItem = (props) => (
  <ContentLoader 
    speed={2}
    width={310}
    height={390}
    viewBox="0 0 310 390"
    backgroundColor="#cbb2fe"
    foregroundColor="#dfe7fd"
    {...props}
  >
    <rect x="20" y="220" rx="6" ry="6" width="267" height="12" /> 
    <rect x="15" y="249" rx="6" ry="6" width="45" height="12" /> 
    <circle cx="35" cy="341" r="16" /> 
    <rect x="9" y="26" rx="15" ry="15" width="292" height="176" /> 
    <rect x="255" y="269" rx="6" ry="6" width="45" height="12" /> 
    <rect x="255" y="294" rx="6" ry="6" width="45" height="12" />
  </ContentLoader>
)

export default SkeletonProductItem;