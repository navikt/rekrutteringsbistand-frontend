import{aq as w,J as I,j as t,R as k,S as j,cn as x,cw as b,cv as g,co as u,O as y,cP as _}from"./iframe-BVpQlhXu.js";import{w as m,c as D}from"./ContextDecorators-POtdOfgt.js";import{F as N,A as v}from"./FullførtStilling-DTsI8t9a.js";import{R as T}from"./GjenåpneStillingKnapp-9D35V2jO.js";import{T as A}from"./TilgangskontrollForInnhold-jHmYi0ix.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-xWK2vGKb.js";import"./OrganisasjonsnummerAlert-D88qbzcp.js";import"./VStack-BlOHU-0T.js";import"./BasePrimitive-CjllcUPO.js";import"./List-DNLt3jEI.js";import"./Link-BFymvS_W.js";import"./KandidatHendelseTag-0d_ofy_p.js";import"./Tag-C3Ns-E6i.js";import"./ChatExclamationmark-CN_Z3M77.js";import"./FileXMark-Cqwhuf8x.js";import"./Trash-CXt3Z_EP.js";import"./HandShakeHeart-BlEIaLmf.js";import"./Calendar-WyB0cMbI.js";import"./ThumbUp-AQ4KgzJP.js";import"./ExclamationmarkTriangle-3r4Z2Jmc.js";import"./Table-ClebMMPG.js";import"./index-C9yN7hBY.js";import"./index-B40KJ5b4.js";import"./util-Dq2C0rzv.js";import"./DatoVelger-BAAF-WdQ.js";import"./useDatepicker-DmSmsG6q.js";import"./useControllableState-J-GqUv9G.js";import"./Modal-BGlsUYHe.js";import"./floating-ui.react-3U288saN.js";import"./Date.Input-KCgvmNDy.js";import"./useFormField-YVNxZSU4.js";import"./ChevronDown-BiNlS0AG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C2oyJy3J.js";import"./Modal.context-n9RJuXC-.js";import"./Popover-NiLXsyyw.js";import"./DismissableLayer-DNoYzt-k.js";import"./startOfMonth-DjcBqpVQ.js";import"./Select-D8RvqNVa.js";import"./endOfMonth-BF_3YzKA.js";import"./ArrowLeft-uIIzQKi_.js";import"./ArrowRight-DBt4HaHo.js";import"./isSameDay-Cj5CaInE.js";import"./Checkbox-CwuOTcku.js";import"./Fieldset-BXdz7LyL.js";import"./accordion-NySxg22O.js";import"./index-BDtkV6DO.js";import"./index-CZXtsrNA.js";import"./index-CTyirFyM.js";import"./Box-SrhVKU8e.js";import"./Bell-vWZO5_LQ.js";import"./PersonChat-DcpvuHRs.js";import"./Eye-CYgAHLLo.js";import"./ProgressBar-D-nEn26O.js";import"./useLatestRef-Dfj7Kd_V.js";import"./ShieldLock-DmgPMuN1.js";import"./PadlockLocked-BJP_KrFN.js";import"./EyeSlash-C9asfWrP.js";import"./CircleSlash-BIQ2EaNy.js";import"./Pencil-DoMHDGWr.js";import"./FullførStillingModal-DBoXwbvS.js";import"./PersonbrukerTekst-PmvSgYN2.js";import"./ClockDashed-CBlkLFBC.js";import"./IkonNavnAvatar-DNJHlD7Y.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-CY0QeSv7.js";import"./ErrorBoundary-GqC8zQ3j.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
