import TrainingsPlans from '@/public/navbar/trainings-plans.svg';
import TrainingsStart from '@/public/navbar/trainings-start.svg';
import TrainingsHistory from '@/public/navbar/trainings-history.svg';
import TrainingsPlanning from '@/public/navbar/trainings-planning.svg';

const icons = new Map([
   [`Plans`, TrainingsPlans],
   [`Start training`, TrainingsStart],
   [`History`, TrainingsHistory],
   [`Create plan`, TrainingsPlanning],
]);

interface DynamicIconProps {
   name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
   const Icon = icons.get(name);
   return <Icon {...props} />;
};

export default DynamicIcon;
