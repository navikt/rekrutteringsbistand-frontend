import{aw as I,T as w,j as t,x as k,S as x,cz as j,cI as b,cH as g,cA as u,X as y,c$ as _}from"./iframe-BI30XQnF.js";import{w as m,c as D}from"./ContextDecorators-DuKEksGm.js";import{F as N,A as v}from"./FullførtStilling-DypHU4qA.js";import{R as T}from"./GjenåpneStillingKnapp-itmDv_Ry.js";import{T as A}from"./TilgangskontrollForInnhold-DdtzRcBN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BnxcNx4Y.js";import"./OrganisasjonsnummerAlert-W15zpEie.js";import"./VStack-CZMV2HC4.js";import"./BasePrimitive-CZE9qk7F.js";import"./List-BIkHkuYY.js";import"./Link-D4z1f04J.js";import"./KandidatHendelseTag-CSskVXBJ.js";import"./Tag-Dxs0Vko4.js";import"./ChatExclamationmark-DF-1Cb_k.js";import"./FileXMark-DnOgS1YU.js";import"./Trash-3JQrFA94.js";import"./HandShakeHeart-DAxA4Ims.js";import"./Calendar-iJrxzXuD.js";import"./ThumbUp-CKLFu6F5.js";import"./Table-nidyqZEJ.js";import"./index-DkFBChQ6.js";import"./index-B40KJ5b4.js";import"./util-fxl2veKI.js";import"./DatoVelger-BXxHA6AL.js";import"./useDatepicker-DEY7G03N.js";import"./useControllableState-DEvJbc5V.js";import"./Modal-bVJ2R-tw.js";import"./floating-ui.react-BxirlH8W.js";import"./Date.Input-Bb1wLdYj.js";import"./useFormField-BSE-6FGG.js";import"./ChevronDown-CIFnBDD2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DyDkmotJ.js";import"./Modal.context-CrBnhJq6.js";import"./Popover-BLioJgLw.js";import"./DismissableLayer-UGMmz6iD.js";import"./startOfMonth-DFkN0qP0.js";import"./Select-C-2okUqT.js";import"./endOfMonth-BD1XmrxE.js";import"./ArrowLeft-DNG9Fllq.js";import"./ArrowRight-bRd3Jy3v.js";import"./isSameDay-BLfGpotf.js";import"./Checkbox-_-L6uDSd.js";import"./Fieldset-CKTBUi2a.js";import"./accordion-BF9-QnzN.js";import"./index-WP1qhivJ.js";import"./index-DFTlTciK.js";import"./index-CV9OQHya.js";import"./Box-Dlos6FLo.js";import"./Bell-CbUYiCPB.js";import"./PersonChat-DKca6zFW.js";import"./Eye-P48W7tcE.js";import"./ProgressBar-Cs9dR_wj.js";import"./useLatestRef-DOqucmqf.js";import"./ShieldLock-saRzKnaN.js";import"./PadlockLocked-RatI5c9_.js";import"./EyeSlash-DJFtmOje.js";import"./CircleSlash-DNlY45_B.js";import"./Pencil-knGRv3yv.js";import"./FullførStillingModal-ClbzROrq.js";import"./PersonbrukerTekst-BBon-Vbp.js";import"./ClockDashed-C55BevE_.js";import"./IkonNavnAvatar-Bt0YiBAW.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-DjMuJtIE.js";import"./ErrorBoundary-DdwQ6Ipf.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const $t={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,$t as default};
