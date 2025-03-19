// import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
// import Quest from "@/class/quest";
// import supabase from "@/utils/supabaseClient";


// interface AdviceModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   quest: Quest;
// }

// const AdviceModal: React.FC<AdviceModalProps> = ({
//   isOpen,
//   onClose,
//   quest,
// }) => {
//   const [advice, setAdvice] = useState<string>("");

//   useEffect(() => {
//     if (isOpen) {
//       const fetchAdvice = async () => {
//         const { data, error } = await supabase
//           .from("advice")
//           .select("content")
//           .eq("category", quest.category)
//           .single();

//         if (error) {
//           console.error("Error fetching advice:", error);
//         } else {
//           setAdvice(data.content);
//         }
//       };

//       fetchAdvice();
//     }
//   }, [isOpen, quest.category]);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>クエストアドバイス</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <p>{advice}</p>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={onClose}>
//             閉じる
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default AdviceModal;
