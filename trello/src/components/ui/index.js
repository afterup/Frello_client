import Vue from 'vue';

import BaseContainer from '@/components/ui/BaseContainer';
import BaseIcon from '@/components/ui/BaseIcon';
import BaseBtn from '@/components/ui/BaseBtn';
import BaseInput from '@/components/ui/BaseInput';
import Modal from '@/components/ui/Modal';

const components = {
	BaseContainer,
	BaseIcon,
	BaseInput,
	BaseBtn,
	Modal,
};

Object.keys(components).forEach(name => Vue.component(name, components[name]));
