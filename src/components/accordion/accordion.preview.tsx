import { Accordion } from './accordion.js';
import { default as ICON } from '../../icons/Bell.js';

const config = {
	title: 'accordion',
};

function Simple() {
	return (
		<Accordion>
			<Accordion.Item title="Lorem ipsum">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, perferendis, sequi. Debitis enim esse eum illo laborum natus neque nulla numquam, pariatur quos tenetur vitae voluptate voluptatum. Accusamus deserunt ea iste nihil, nisi non officia reiciendis repudiandae saepe similique ut.
				</p>
			</Accordion.Item>
			<Accordion.Item title="Disabled" disabled>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, perferendis, sequi. Debitis enim esse eum illo laborum natus neque nulla numquam, pariatur quos tenetur vitae voluptate voluptatum. Accusamus deserunt ea iste nihil, nisi non officia reiciendis repudiandae saepe similique ut.
				</p>
			</Accordion.Item>
			<Accordion.Item title="With icon" icon={ <ICON /> } heading="h4">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, perferendis, sequi. Debitis enim esse eum illo laborum natus neque nulla numquam, pariatur quos tenetur vitae voluptate voluptatum. Accusamus deserunt ea iste nihil, nisi non officia reiciendis repudiandae saepe similique ut.
				</p>
			</Accordion.Item>
			<Accordion.Item title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, perferendis, sequi.">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, perferendis, sequi. Debitis enim esse eum illo laborum natus neque nulla numquam, pariatur quos tenetur vitae voluptate voluptatum. Accusamus deserunt ea iste nihil, nisi non officia reiciendis repudiandae saepe similique ut.
				</p>
			</Accordion.Item>
		</Accordion>
	);
}

export default config;
export { Simple };
