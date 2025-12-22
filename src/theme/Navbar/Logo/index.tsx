import React, {type ReactNode} from 'react';
import Logo from '@theme-original/Navbar/Logo';
import type LogoType from '@theme/Navbar/Logo';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof LogoType>;

export default function LogoWrapper(props: Props): ReactNode {
  return (
    <>
      <Logo {...props} />
    </>
  );
}
