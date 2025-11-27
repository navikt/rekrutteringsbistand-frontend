import{aw as w,U as I,j as t,y as k,S as x,cx as j,cF as y,cE as g,cy as u,Y as b,cZ as _}from"./iframe-D39VVUvN.js";import{w as m,c as A}from"./ContextDecorators-QAcQZAVc.js";import{F as N,A as v}from"./FullførtStilling-wwDukPBQ.js";import{R as T}from"./GjenåpneStillingKnapp-BP_Hasgm.js";import{T as E}from"./TilgangskontrollForInnhold-CN0syYDD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D4uu2T-2.js";import"./OrganisasjonsnummerAlert-Dy1OqmL4.js";import"./VStack-BQhXnRv5.js";import"./BasePrimitive-MQf7OfQJ.js";import"./List-Dfv5dPXI.js";import"./Link-CPTb3KmN.js";import"./KandidatHendelseTag-C9smeLbY.js";import"./Tag-DHJh71jG.js";import"./ChatExclamationmark-C_hdwPLg.js";import"./FileXMark-C9AaQ49C.js";import"./Trash-CPVW59ly.js";import"./HandShakeHeart-C6VM6-ej.js";import"./Calendar-B31z38Bc.js";import"./ThumbUp-Bbodya7O.js";import"./Table-Dvx2SbC1.js";import"./index-DVkrSIrT.js";import"./index-B40KJ5b4.js";import"./util-B3YawHvy.js";import"./DatoVelger-BWIaZEq8.js";import"./useDatepicker-YFBmlOkK.js";import"./useControllableState-BVmDx8dp.js";import"./Modal-Ba_A0xGU.js";import"./floating-ui.react-UTckooEH.js";import"./Date.Input-DKdz0zTn.js";import"./useFormField-CzWypWoY.js";import"./ChevronDown-0Sqg8eG_.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-xrnbNCv7.js";import"./Modal.context-Bhs-zAbL.js";import"./Popover-BrJ_DUMA.js";import"./DismissableLayer-BaPy2MN_.js";import"./startOfMonth-DmIqeDTP.js";import"./Select-Bf9vjNm_.js";import"./endOfMonth-IrPiOGLS.js";import"./ArrowLeft-C3-Xxvdd.js";import"./ArrowRight-Bn9KbPdd.js";import"./isSameDay-PBWyqJip.js";import"./Checkbox-BACcchoR.js";import"./Fieldset-ClN05z-K.js";import"./accordion-BUfUAaf5.js";import"./index-BNhx7d9_.js";import"./index-Bkz6GSMn.js";import"./index-C54K5i1R.js";import"./Box-VEo8gjQ0.js";import"./Bell-cPvv4iVm.js";import"./PersonChat-5QsIgKY1.js";import"./Eye-CiTxYGTv.js";import"./ProgressBar-Bb8SUZwi.js";import"./useLatestRef-DCkpuc9U.js";import"./EyeSlash-CohZj834.js";import"./CircleSlash-DahLZCLc.js";import"./Pencil-Dzb1g18b.js";import"./FullførStillingModal-D23jm27v.js";import"./PersonbrukerTekst-8CCbmxPD.js";import"./ClockDashed-DSoOt-So.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-C61-qPcy.js";import"./ErrorBoundary-BoFN3Ky1.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=w(),d=I(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
