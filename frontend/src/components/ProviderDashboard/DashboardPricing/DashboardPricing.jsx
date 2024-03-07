import { useEffect } from 'react'
import ProviderPricing from '../../ProviderShow/ProviderPricing/ProviderPricing'
import './DashboardPricing.css'
import { useState } from 'react'

const DashboardPricing = ({vendor}) => {
    const [formula, setFormula] = useState('')

    useEffect(()=>{
        if (formula !== vendor?.pricingFormula) {
            setFormula(vendor?.pricingFormula);
        }
    },[vendor])

    return (
        <div className="dashboard-pricing">
            <h2>Your Service</h2>
            <br/>
            <ProviderPricing vendor={vendor} pricingOpen={true} />
            {/* <h3>{service?.name}</h3> */}
            <textarea value={formula} onChange={e => setFormula(e.target.value)}>
                {formula}
            </textarea>
        </div>
    )
}

export default DashboardPricing;