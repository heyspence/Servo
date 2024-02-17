import { useEffect } from 'react'
import ProviderPricing from '../../ProviderShow/ProviderPricing/ProviderPricing'
import './DashboardPricing.css'
import { useState } from 'react'

const DashboardPricing = ({vendor}) => {
    const [formula, setFormula] = useState(vendor?.formula)
    let service = vendor?.services ? Object.values(vendor.services)[0] : {}

    useEffect(()=>{
        if (formula !== vendor?.formula) {
            setFormula(vendor.formula);
        }
    },[vendor])

    return (
        <div className="dashboard-pricing">
            <h2>Your Service</h2>
            <br/>
            <ProviderPricing service={service} pricingOpen={true} />
            <h3>{service?.name}</h3>
            <textarea value={formula} onChange={e => setFormula(e.target.value)}>
                {service?.formula}
            </textarea>
        </div>
    )
}

export default DashboardPricing;