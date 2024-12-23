import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
} from '@erist-opt/shadcn/components/ui/drawer';
import { Button } from '@erist-opt/shadcn/components/ui/button';
import { FC } from 'react';
import PDFViewer from '../../ui/pdfviewer';

interface AgreementDrawerProps {
  open: boolean;
  onClose: () => void;
}

// const pdfUrl = 'https://static.erist.store/fonts/dogovor_opt.pdf';
const pdfUrl = 'https://static.erist.store/fonts/123123.pdf';

const AgreementDrawer: FC<AgreementDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="h-4/5">
        {/* <DrawerHeader>
          <DrawerTitle>Договор</DrawerTitle>
        </DrawerHeader> */}
        <PDFViewer file={pdfUrl} />
        <DrawerFooter>
          <Button onClick={onClose}>Закрыть</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AgreementDrawer;
